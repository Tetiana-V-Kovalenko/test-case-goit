import React from 'react';
import ProfileCard from './ProfileCard/ProfileCard';
import users from '../utils/users.json';
import PropTypes from 'prop-types';
export class App extends React.Component {
  state = {
    users: users.map(user => {
      return { ...user, isFollowing: false };
    }),
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem(`users`)) !== null) {
      const savedUsers = JSON.parse(localStorage.getItem(`users`));
      this.setState({
        users: savedUsers,
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(`users`, JSON.stringify(this.state.users));
  }

  onFollowClick = e => {
    this.setState(prevState => {
      return {
        users: prevState.users.map(user => {
          if (user.id === Number(e.target.id)) {
            const newIsFollowing = !user.isFollowing;
            return {
              ...user,
              isFollowing: newIsFollowing,
              followers: newIsFollowing
                ? user.followers + 1
                : user.followers - 1,
            };
          }
          return user;
        }),
      };
    });
  };

  addComma = followers => {
    const strFollowers = followers.toString();
    const lastTreeLetter = strFollowers.slice(-3);
    const strBasis = strFollowers.slice(0, -3);
    if (strBasis.length === 0) {
      return lastTreeLetter;
    }
    return `${this.addComma(strBasis)},${lastTreeLetter}`;
  };

  render() {
    const allUsers = this.state.users;
    return (
      <div>
        {allUsers.map(
          ({ id, tweets, followers, avatar, user, isFollowing }) => {
            const followersWithComma = this.addComma(followers);
            return (
              <ProfileCard
                key={id}
                id={id}
                tweets={tweets}
                followers={followersWithComma}
                avatar={avatar}
                user={user}
                isFollowing={isFollowing}
                onFollowClick={this.onFollowClick}
              />
            );
          }
        )}
      </div>
    );
  }
}
App.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.string,
      tweets: PropTypes.number,
      followers: PropTypes.number,
      avatar: PropTypes.string,
    })
  ),
};

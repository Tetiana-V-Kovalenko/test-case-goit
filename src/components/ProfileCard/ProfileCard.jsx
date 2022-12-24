import React from 'react';

import headImage from '../../images/Picture.png';

import logoCompany from '../../images/Logo.png';
import css from './ProfileCard.module.css';

class ProfileCard extends React.Component {
  render() {
    const { avatar, user, tweets, id, isFollowing, followers, onFollowClick } =
      this.props;

    return (
      <div className={css.cardItem} id={id}>
        <img className={css.logoCompany} src={logoCompany} alt="Logo" />
        <img className={css.headImage} src={headImage} alt="Head" />
        <span className={css.imageProfileBlock}>
          <img className={css.imageProfile} src={avatar} alt={user} />
        </span>

        <ul className={css.statisticsProfile}>
          <li className={css.statisticProfile}>{tweets} TWEETS</li>
          <li className={css.statisticProfile}>{followers} FOLLOWERS</li>
        </ul>
        <button
          type="button"
          onClick={onFollowClick}
          id={id}
          className={isFollowing ? css.profileBtn__active : css.profileBtn}
        >
          {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </button>
      </div>
    );
  }
}
export default ProfileCard;

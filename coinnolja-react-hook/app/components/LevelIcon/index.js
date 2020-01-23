/**
 *
 * LevelIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Level1 from '../../images/level/M1.gif';
import Level2 from '../../images/level/M2.gif';
import Level3 from '../../images/level/M3.gif';
import Level4 from '../../images/level/M4.gif';
import Level5 from '../../images/level/M5.gif';
import Level6 from '../../images/level/M6.gif';
import Level7 from '../../images/level/M7.gif';
import Level8 from '../../images/level/M8.gif';
import Level9 from '../../images/level/M10.gif';
import Level10 from '../../images/level/M11.gif';
import Level11 from '../../images/level/M12.gif';
import Level12 from '../../images/level/M13.gif';
import Level13 from '../../images/level/M14.gif';
import Level14 from '../../images/level/M15.gif';
import Level15 from '../../images/level/M16.gif';
import Level16 from '../../images/level/M17.gif';
import Level17 from '../../images/level/M18.gif';
import Level18 from '../../images/level/M19.gif';
import Level19 from '../../images/level/M20.gif';
import LevelAdmin from '../../images/level/M30.gif';

function LevelIcon({ level }) {
  // console.log(`level :::: ${level}`);
  switch (parseInt(level, 0)) {
    case 1:
      return (
        <div>
          <img src={Level1} alt="" />
        </div>
      );
    case 2:
      return (
        <div>
          <img src={Level2} alt="" />
        </div>
      );
    case 3:
      return (
        <div>
          <img src={Level3} alt="" />
        </div>
      );

    case 4:
      return (
        <div>
          <img src={Level4} alt="" />
        </div>
      );
    case 5:
      return (
        <div>
          <img src={Level5} alt="" />
        </div>
      );
    case 6:
      return (
        <div>
          <img src={Level6} alt="" />
        </div>
      );
    case 7:
      return (
        <div>
          <img src={Level7} alt="" />
        </div>
      );
    case 8:
      return (
        <div>
          <img src={Level8} alt="" />
        </div>
      );
    case 9:
      return (
        <div>
          <img src={Level9} alt="" />
        </div>
      );
    case 10:
      return (
        <div>
          <img src={Level10} alt="" />
        </div>
      );
    case 11:
      return (
        <div>
          <img src={Level11} alt="" />
        </div>
      );
    case 12:
      return (
        <div>
          <img src={Level12} alt="" />
        </div>
      );
    case 13:
      return (
        <div>
          <img src={Level13} alt="" />
        </div>
      );
    case 14:
      return (
        <div>
          <img src={Level14} alt="" />
        </div>
      );
    case 15:
      return (
        <div>
          <img src={Level15} alt="" />
        </div>
      );
    case 16:
      return (
        <div>
          <img src={Level16} alt="" />
        </div>
      );
    case 17:
      return (
        <div>
          <img src={Level17} alt="" />
        </div>
      );
    case 18:
      return (
        <div>
          <img src={Level18} alt="" />
        </div>
      );
    case 19:
      return (
        <div>
          <img src={Level19} alt="" />
        </div>
      );
    case 99:
      return (
        <div>
          <img src={LevelAdmin} alt="" />
        </div>
      );
    default:
      return (
        <div>
          <img src={Level1} alt="" />
        </div>
      );
  }
}

LevelIcon.propTypes = {
  level: PropTypes.number.isRequired,
};

export default LevelIcon;

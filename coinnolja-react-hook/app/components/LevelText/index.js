/**
 *
 * LevelText
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function LevelText({ level }) {
  // console.log(`level :::: ${level}`);
  switch (parseInt(level, 0)) {
    case 1:
      return <span>훈련병</span>;
    case 2:
      return <span>이등병</span>;
    case 3:
      return <span>일병</span>;
    case 4:
      return <span>상병</span>;
    case 5:
      return <span>병장</span>;
    case 6:
      return <span>하사</span>;
    case 7:
      return <span>중사</span>;
    case 8:
      return <span>상사</span>;
    case 9:
      return <span>소위</span>;
    case 10:
      return <span>중위</span>;
    case 11:
      return <span>대위</span>;
    case 12:
      return <span>소령</span>;
    case 13:
      return <span>중령</span>;
    case 14:
      return <span>대령</span>;
    case 15:
      return <span>준장</span>;
    case 16:
      return <span>소장</span>;
    case 17:
      return <span>중장</span>;
    case 18:
      return <span>대장</span>;
    case 19:
      return <span>원수</span>;
    case 99:
      return <span>운영자</span>;
    default:
      return <span>훈련병</span>;
  }
}

LevelText.propTypes = {
  level: PropTypes.number.isRequired,
};

export default LevelText;

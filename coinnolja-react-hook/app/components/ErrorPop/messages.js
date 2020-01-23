/*
 * ErrorPop Messages
 *
 * This contains all the text for the ErrorPop component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ErrorPop';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ErrorPop component!',
  },
  500100: {
    id: `${scope}.500100`,
    defaultMessage: '허용되지 않는 비밀번호 형식 입니다.',
  },
  500101: {
    id: `${scope}.500101`,
    defaultMessage: '비밀번호는 필수 입력값 입니다.',
  },
  500102: {
    id: `${scope}.500102`,
    defaultMessage:
      '비밀번호는 영소문자, 영대문자, 숫자를 반드시 포함한 8~25자리를 입력해 주세요',
  },
  500103: {
    id: `${scope}.500103`,
    defaultMessage: '비밀번호(확인)은 필수 입력값 입니다.',
  },
  500104: {
    id: `${scope}.500104`,
    defaultMessage:
      '비밀번호(확인)은 영소문자, 영대문자, 숫자를 반드시 포함한 8~25자리를 입력해 주세요',
  },
  500105: {
    id: `${scope}.500105`,
    defaultMessage: '비밀번호가 일치하지 않습니다.',
  },
  500106: {
    id: `${scope}.500106`,
    defaultMessage: '아이디는 필수 입력 값 입니다.',
  },
  500107: {
    id: `${scope}.500107`,
    defaultMessage: '이미 사용중인 아이디 입니다.',
  },
  500108: {
    id: `${scope}.500108`,
    defaultMessage: '이메일은 필수 입력 값 입니다.',
  },
  500109: {
    id: `${scope}.500109`,
    defaultMessage: '이미 사용중인 이메일 입니다.',
  },
  500110: {
    id: `${scope}.500110`,
    defaultMessage: '올바른 이메일 형식이 아닙니다.',
  },
  500111: {
    id: `${scope}.500111`,
    defaultMessage: 'Profile Image is empty',
  },
  500112: {
    id: `${scope}.500112`,
    defaultMessage: '닉네임은 필수 입력 값 입니다.',
  },
  500113: {
    id: `${scope}.500113`,
    defaultMessage: '이미 사용중인 닉네임 입니다.',
  },
  500114: {
    id: `${scope}.500114`,
    defaultMessage: '구글 Recaptcha 문제입니다 새로고침 후 다시 시도해 주세요.',
  },
  500115: {
    id: `${scope}.500115`,
    defaultMessage: '봇으로 의심되는 패턴 입니다 잠시 후 다시 시도해 주세요.',
  },
  800100: {
    id: `${scope}.800100`,
    defaultMessage: '아이디와 비밀번호를 입력해 주세요.',
  },
  800101: {
    id: `${scope}.800101`,
    defaultMessage: '아이디 또는 비밀번호가 일치하지 않습니다.',
  },
  500302: {
    id: `${scope}.500302`,
    defaultMessage: '이미 추천/비추전한 게시글 입니다.',
  },
  403001: {
    id: `${scope}.403001`,
    defaultMessage: '이메일인증 이후 사용 가능합니다.',
  },
  401001: {
    id: `${scope}.401001`,
    defaultMessage: '로그인이 필요한 서비스 입니다.',
  },
  500116: {
    id: `${scope}.500116`,
    defaultMessage: '이메일을 입력해 주세요.',
  },
  500117: {
    id: `${scope}.500117`,
    defaultMessage: '해당 이메일로 가입된 정보가 없습니다.',
  },
  500119: {
    id: `${scope}.500119`,
    defaultMessage: '이미 신고한 게시글 입니다.',
  },
  403002: {
    id: `${scope}.403002`,
    defaultMessage: '소령계급 이상 입장 가능합니다.',
  },
  403003: {
    id: `${scope}.403003`,
    defaultMessage: '원수계급 부터 입장 가능합니다.',
  },
});

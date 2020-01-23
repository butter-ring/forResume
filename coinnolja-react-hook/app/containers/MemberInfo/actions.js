/*
 *
 * MemberInfo actions
 *
 */

import {
  DEFAULT_ACTION,
  FIND_MEMBERINFO,
  FIND_MEMBERINFO_SUCCESS,
  FIND_MEMBERINFO_ERROR,
  FIND_MEMBERBOARDLIST,
  FIND_MEMBERBOARDLIST_SUCCESS,
  FIND_MEMBERBOARDLIST_ERROR,
  FIND_MEMBERREPLYLIST,
  FIND_MEMBERREPLYLIST_SUCCESS,
  FIND_MEMBERREPLYLIST_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function findMemberInfo(memberId) {
  return {
    type: FIND_MEMBERINFO,
    memberId,
  };
}

export function findMemberInfoSuccess(memberInfo) {
  return {
    type: FIND_MEMBERINFO_SUCCESS,
    memberInfo,
  };
}

export function findMemberInfoError(error) {
  return {
    type: FIND_MEMBERINFO_ERROR,
    error,
  };
}

export function findMemberBoardList(memberId, pageIndex) {
  return {
    type: FIND_MEMBERBOARDLIST,
    memberId,
    pageIndex,
  };
}

export function findMemberBoardListSuccess(memberBoard) {
  return {
    type: FIND_MEMBERBOARDLIST_SUCCESS,
    memberBoard,
  };
}

export function findMemberBoardListError(error) {
  return {
    type: FIND_MEMBERBOARDLIST_ERROR,
    error,
  };
}

export function findMemberReplyList(memberId, pageIndex) {
  return {
    type: FIND_MEMBERREPLYLIST,
    memberId,
    pageIndex,
  };
}

export function findMemberReplyListSuccess(memberReply) {
  return {
    type: FIND_MEMBERREPLYLIST_SUCCESS,
    memberReply,
  };
}

export function findMemberReplyListError(error) {
  return {
    type: FIND_MEMBERREPLYLIST_ERROR,
    error,
  };
}

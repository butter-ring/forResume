package com.coinnolja.web.api.member;

import com.coinnolja.web.api.member.model.MemberNote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberNoteRepository extends CrudRepository<MemberNote, Long> {

    // 받은 쪽지 목록 가져오기.
    //List<MemberNote> findAllByReceiverIdAndRecvDel(Long receiverId, int recvDel);

    Page<MemberNote> findAllByReceiverIdAndRecvDelOrderBySendAtDesc(Pageable pageable, Long receiverId, int recvDel);

    MemberNote findBySenderIdAndSendAt(Long senderId, Long senderAt);


    //Page<MemberNote> findAllByReceiverIdAndRecvDel(Pageable pageable, Long receiverId, int recvDel);

}


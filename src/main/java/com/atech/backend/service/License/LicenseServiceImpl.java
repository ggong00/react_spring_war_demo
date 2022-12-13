package com.atech.backend.service.License;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.mail.MailDto;
import com.atech.backend.mail.MailService;
import com.atech.backend.repository.license.LicenseDAO;
import com.atech.backend.repository.license.MyLicense;
import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.question.QuestionDAO;
import com.atech.backend.repository.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LicenseServiceImpl implements LicenseService {

    final private LicenseDAO licenseDAO;
    final private QuestionDAO questionDAO;
    final private MailService mailService;

    @Override
    public boolean createLicense(LicenseDTO.MyLicenseReq myLicenseReq) throws MessagingException, IOException {

        //라이선스 지급
        Integer resultCnt1 = licenseDAO.createLicense(myLicenseReq.toEntity());
        Integer resultCnt2 = questionDAO.changeStatus(Question.STATUS_SUCCESS, myLicenseReq.getQuestionId());

        //메일 전송
        String licenseHTML = mailService.createLicenseHTML(myLicenseReq);
        MailDto mailDto = new MailDto();
        mailDto.setAddress(myLicenseReq.getEmail());
        mailDto.setMailTitle(myLicenseReq.getMailTitle());
        mailDto.setMessage(licenseHTML);
        mailDto.setAttachFileList(myLicenseReq.getAttachFileList());

        mailService.sendMail(mailDto);

        return resultCnt1 + resultCnt2 != 2 ? false : true;
    }

    @Override
    public List<LicenseDTO.MyLicenseRes> findMyLicense() {
        User principal = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        log.info("principal.getUserId() {} ", principal.getUserId());

        List<MyLicense> myLicenseList = licenseDAO.findMyLicense(principal.getUserId());
        List<LicenseDTO.MyLicenseRes> licenseResList = myLicenseList.stream()
                .map(MyLicense::toMyLicenseRes)
                .collect(Collectors.toList());

        return licenseResList;
    }

}

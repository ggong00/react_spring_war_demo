package com.atech.backend.service.License;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.repository.license.LicenseDAO;
import com.atech.backend.repository.license.MyLicense;
import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.question.QuestionDAO;
import com.atech.backend.repository.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LicenseServiceImpl implements LicenseService {

    final private LicenseDAO licenseDAO;
    final private QuestionDAO questionDAO;

    @Override
    public Integer createLicense(LicenseDTO.MyLicenseReq myLicenseReq) {
        Integer resultCnt1 = licenseDAO.createLicense(myLicenseReq.toEntity());
        Integer resultCnt2 = questionDAO.changeStatus(Question.STATUS_SUCCESS, myLicenseReq.getQuestionId());

        return resultCnt1 + resultCnt2;
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

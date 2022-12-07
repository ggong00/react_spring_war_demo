package com.atech.backend.service.License;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.repository.license.MyLicense;

import java.util.List;

public interface LicenseService {

    Integer createLicense(LicenseDTO.MyLicenseReq myLicenseReq);

    List<LicenseDTO.MyLicenseRes> findMyLicense();

}

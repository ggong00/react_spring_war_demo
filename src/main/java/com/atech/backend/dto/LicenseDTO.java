package com.atech.backend.dto;

import com.atech.backend.repository.license.MyLicense;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class LicenseDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class MyLicenseRes {
        private Long myLicenseId;
        private String name;
        private String belong;
        private String position;
        private String solutionName;
        private String siteId;
        private String sitePass;
        private String siteUrl;
        private String startDate;
        private String endDate;
        private boolean status;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class MyLicenseReq {
        private Long solutionId;
        private Long questionId;
        private String userId;
        private String email;
        private String siteId;
        private String sitePass;
        private String siteUrl;

        public MyLicense toEntity(){
            Solution solution = new Solution();
            solution.setSolutionId(this.solutionId);
            User user = new User();
            user.setUserId(this.userId);
            LocalDateTime startData = LocalDateTime.now();
            LocalDateTime endData = startData.plusDays(15);

            return MyLicense.builder()
                    .solution(solution)
                    .user(user)
                    .siteId(this.siteId)
                    .sitePass(this.sitePass)
                    .siteUrl(this.siteUrl)
                    .startDate(startData)
                    .endDate(endData)
                    .build();
        }
    }
}

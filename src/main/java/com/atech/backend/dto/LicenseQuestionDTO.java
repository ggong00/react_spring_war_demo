package com.atech.backend.dto;

import com.atech.backend.repository.license_question.LicenseQuestion;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.*;

@Data
public class LicenseQuestionDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class LicenseQuestionRes {
        private Long licenseQuestionId;
        private Long solutionId;
        private String userId;
        private String solutionName;
        private String belong;
        private String name;
        private String position;
        private String tel;
        private String email;
        private String title;
        private String contents;
        private String resYn;
        private String createDtm;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class LicenseQuestionReq {
        private Long licenseQuestionId;
        private Long solutionId;
        private String userId;
        private String title;
        private String contents;

        public LicenseQuestion toEntity(){
            Solution solution = new Solution();
            solution.setSolutionId(this.solutionId);
            User user = new User();
            user.setUserId(this.userId);

            return LicenseQuestion.builder()
                    .licenseQuestionId(this.licenseQuestionId)
                    .solution(solution)
                    .user(user)
                    .title(this.title)
                    .contents(this.contents)
                    .build();
        }

    }
}
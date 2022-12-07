package com.atech.backend.repository.question;

import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    private Long questionId;
    private Solution solution;
    private User user;
    private String belong;
    private String name;
    private String position;
    private String tel;
    private String email;
    private String title;
    private String contents;
    private LocalDateTime createDtm;
    private String resYn;

    public QuestionDTO.QuestionRes toQuestionRes () {
        return QuestionDTO.QuestionRes
                .builder()
                .questionId(this.questionId)
                .solutionId(this.solution.getSolutionId())
                .solutionName(this.solution.getSolutionName())
                .userId(this.user.getUserId())
                .name(this.name)
                .position(this.position)
                .tel(this.tel)
                .email(this.email)
                .belong(this.belong)
                .title(this.title)
                .contents(this.contents)
                .build();
    }
}

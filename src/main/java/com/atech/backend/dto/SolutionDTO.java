package com.atech.backend.dto;

import com.atech.backend.repository.solution.Detail;
import com.atech.backend.repository.license.License;
import lombok.*;

import java.util.List;

@Data
public class SolutionDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class SolutionRes{
        private Long solutionId;
        private String solutionName;
        private String imgPass;
        private List<Detail> detail;
        private List<License> license;
    }
}

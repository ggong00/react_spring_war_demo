package com.atech.backend.repository.solution;

import com.atech.backend.repository.license.License;

import java.util.List;

public interface SolutionDAO {

    List<Solution> findALlBySolution();

    List<Detail> findALlByDetail(Long solutionId);

    List<License> findALlByLicense(Long solutionId);

}

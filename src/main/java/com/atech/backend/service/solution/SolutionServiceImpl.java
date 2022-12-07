package com.atech.backend.service.solution;

import com.atech.backend.dto.SolutionDTO;
import com.atech.backend.response.ResponseMsg;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.solution.SolutionDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SolutionServiceImpl implements SolutionService{

    final private SolutionDAO solutionDAO;

    @Override
    public List<SolutionDTO.SolutionRes> findALl() {
        ResponseMsg responseMsg = new ResponseMsg();

        //전체 솔루션 조회
        List<Solution> findList = solutionDAO.findALlBySolution();

        //솔루션 디테일 / 라이선스 조회
        List<SolutionDTO.SolutionRes> solutionRes = findList.stream()
                .map(solution -> {
                    Solution newSolution = new Solution();
                    BeanUtils.copyProperties(solution, newSolution);
                    newSolution.setDetail(solutionDAO.findALlByDetail(solution.getSolutionId()));
                    newSolution.setLicense(solutionDAO.findALlByLicense(solution.getSolutionId()));
                    return newSolution.toSolutionRes();
                })
                .collect(Collectors.toList());

        return solutionRes;
    }
}

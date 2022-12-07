package com.atech.backend.repository.solution;

import com.atech.backend.repository.license.License;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SolutionDAOImpl implements SolutionDAO {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<Solution> findALlBySolution() {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM solution ");

        List<Solution> solutionList = jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(Solution.class)
        );

        return solutionList;
    }

    @Override
    public List<Detail> findALlByDetail(Long solutionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM detail ");
        sql.append(" where solution_id = ? ");

        List<Detail> detailList = jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(Detail.class),
                solutionId
        );

        return detailList;
    }

    @Override
    public List<License> findALlByLicense(Long solutionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM license ");
        sql.append(" where solution_id = ? ");

        List<License> licenseList = jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(License.class),
                solutionId
        );

        return licenseList;
    }
}

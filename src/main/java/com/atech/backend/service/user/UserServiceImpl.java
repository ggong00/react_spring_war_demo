package com.atech.backend.service.user;

import com.atech.backend.config.security.PBKDF2Util;
import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.UserDTO;
import com.atech.backend.repository.user.User;
import com.atech.backend.repository.user.UserDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserDAO userDAO;
    private final PBKDF2Util pbkdf2Util;

    @Override
    public User findByUserId(String userId) {
        Optional<User> userOptional = userDAO.findByUserId(userId);

        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException(
                    "Can't found user."
            );
        }

        return userOptional.get();
    }

    @Override
    public boolean userDuplChk(UserDTO.UserReq userReq) {
        return userDAO.userDuplChk(userReq.toEntity()).isPresent();
    }

    @Override
    public boolean idDuplChk(UserDTO.UserReq userReq) {
        return userDAO.idDuplChk(userReq.toEntity()).isPresent();
    }

    @Override
    public UserDTO.UserInfoRes loginChk() {
        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        String loginUser = principal.toString();


        if (loginUser.equals("anonymousUser")) {
            return null;
        }

        User user = (User) principal;
        return user.toUserInfoRes();
    }

    @Override
    public boolean userDuplChk(LicenseDTO.MyLicenseReq myLicenseReq) {

//        // 요청값에 Id가 존재하면 true
//        if (myLicenseReq.getUserId() != null) {
//            return true;
//        }
        // 요청값에 Id가 존재하면 true
        if (myLicenseReq.getUserId() != null) {
            return true;
        }

        // 계정 값이 없지만 DB에 동일한 전화번호로 가입한 계정이 있다면 true
        User user = User.builder()
                .tel(myLicenseReq.getTel())
                .build();

        Optional<User> optionalUser = userDAO.userDuplChk(user);
        if (!optionalUser.isPresent()) {
            log.info("optionalUser.isPresent() {} ", optionalUser.isPresent());
            return false;
        }

        myLicenseReq.setUserId(optionalUser.get().getUserId());

        return true;
    }

    @Override
    public void join(UserDTO.UserReq userReq) throws NoSuchAlgorithmException, InvalidKeySpecException {
        String hashPass = pbkdf2Util.createHash(userReq.getUserPass());
        User user = userReq.toEntity();
        user.setUserPass(hashPass);

        userDAO.join(user);
    }
}
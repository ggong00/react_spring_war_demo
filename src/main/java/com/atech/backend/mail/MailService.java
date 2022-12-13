package com.atech.backend.mail;

import com.atech.backend.dto.LicenseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class MailService {

    final private JavaMailSender javaMailSender;
    private static final String FROM_ADDRESS = "dev@atech1221.com";

    public void sendMail(MailDto mailDto) throws MessagingException, IOException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        mimeMessageHelper.setSubject(mailDto.getMailTitle());
        mimeMessageHelper.setText(mailDto.getMessage(), true);
        mimeMessageHelper.setTo(mailDto.getAddress());
        mimeMessageHelper.setFrom(FROM_ADDRESS);

        if (!CollectionUtils.isEmpty(mailDto.getAttachFileList())) {
            for (MultipartFile file : mailDto.getAttachFileList()) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                mimeMessageHelper.addAttachment(
                        MimeUtility.encodeText(fileName, "UTF-8", "B"),
                        new ByteArrayResource(StreamUtils.copyToByteArray(file.getInputStream()))
                );
            }
        }

        javaMailSender.send(mimeMessage);
    }

    public String createLicenseHTML(LicenseDTO.MyLicenseReq licenseReq) {
        StringBuffer html = new StringBuffer();
        html.append("   <div style=\"width: 100%; padding: 8px; font-size: 12px;\"> ");
        html.append("       <div style=\"word-break: break-all;\">" + licenseReq.getMessage() + "</div> ");
        html.append("       <div style=\"margin: 12px auto; font-size: 12px; font-weight: bold;\"> ");
        html.append("           <div>솔루션 계정 : <span>" + licenseReq.getSiteId() + "</span></div> ");
        html.append("           <div>솔루션 URL : <span>" + licenseReq.getSitePass() + "</span></div> ");
        html.append("           <div>솔루션 비밀번호 : <a  href=\"" + licenseReq.getSiteUrl() + "\" target=\"_blank\"> 바로가기 </a></div> ");
        html.append("       </div> ");
        html.append("   </div> ");

        return html.toString();
    }

}


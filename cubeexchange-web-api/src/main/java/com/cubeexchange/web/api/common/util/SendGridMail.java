package com.cubeexchange.web.api.common.util;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class SendGridMail {

    @Value("${sendgrid.apikey}")
    private String apikey;


    public void sendMail(String fromEmail, String toEmail, String contents, String subject) throws IOException {
        log.info("]-----]SendGridMail.sendMail[-----[ call ");
        Email from = new Email(fromEmail);
        Email to = new Email(toEmail);
        Content content = new Content("text/html", contents);
        Mail mail = new Mail(from, subject, to, content);
        SendGrid sg = new SendGrid(apikey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            log.info("]-----] SendGridMail.sendMail.response [-----[ {}", response);
        } catch (IOException ex) {
            log.error("]-----] SendGridMail.sendMail.error [-----[ {}", ex);
            throw ex;
        }

    }

    public static void main(String[] args) throws IOException {
        Email from = new Email("test@example.com");
        String subject = "Sending with SendGrid is Fun";
        Email to = new Email("test@example.com");
        Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid("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");
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}


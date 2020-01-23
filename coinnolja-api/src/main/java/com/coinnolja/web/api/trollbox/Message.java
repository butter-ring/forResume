package com.coinnolja.web.api.trollbox;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    public String type;
    public String message;
    public String username;
    public int userLevel;
    public String uuid = RandomStringUtils.randomAlphabetic(15);

//    @JsonCreator
//    public Message(@JsonProperty("type") String type, @JsonProperty("message") String message) {
//        this.type = type;
//        this.message = message;
//    }

//    @JsonIgnore
//    public String getMessage() {
//        return message;
//    }
}

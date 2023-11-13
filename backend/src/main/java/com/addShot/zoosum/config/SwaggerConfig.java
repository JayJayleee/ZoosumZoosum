package com.addShot.zoosum.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
            .info(this.aplInfo());
    }

    private Info aplInfo() {
        return new Info()
            .title("ZooSum API")
            .description("ZooSum API 명세")
            .version("v1.0");
    }

}


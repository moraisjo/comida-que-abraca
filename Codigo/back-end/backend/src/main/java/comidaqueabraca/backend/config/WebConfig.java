package comidaqueabraca.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configura as origens permitidas para o CORS
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173");
    }
}

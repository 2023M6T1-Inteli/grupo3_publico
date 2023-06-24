package inteli.cc6.Middleware;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
/**
 * The Middleware class implements the WebMvcConfigurer interface to provide configuration for CORS (Cross-Origin Resource Sharing) mappings.
 */
public class Middleware implements WebMvcConfigurer {

    /**
     * Configures the CORS mappings.
     *
     * @param registry the CorsRegistry object used to register CORS mappings
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/")
                .allowedOrigins("http://127.0.0.1:3000")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}


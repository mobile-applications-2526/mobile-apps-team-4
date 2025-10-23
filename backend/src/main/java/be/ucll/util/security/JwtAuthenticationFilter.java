package be.ucll.util.security;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        if (HttpMethod.OPTIONS.matches(request.getMethod())
                || path.startsWith("/users/login")
                || path.startsWith("/users/register")
                || path.startsWith("/swagger-ui/")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/h2")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        if (header == null || header.isBlank() || !header.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String token = header.substring(7);

        if (!jwtUtils.validateJwtToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // Extract user info from JWT
        String email = jwtUtils.getEmailFromJwtToken(token);
        Long userId = jwtUtils.getUserIdFromJwtToken(token);

        // Set Spring Security authentication
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userId, null, List.of());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}




// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter {

//     private final JwtUtils jwtUtils;

//     public JwtAuthenticationFilter(JwtUtils jwtUtils) {
//         this.jwtUtils = jwtUtils;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request,
//                                     HttpServletResponse response,
//                                     FilterChain filterChain) throws ServletException, IOException {

//         String path = request.getRequestURI();
//         if (HttpMethod.OPTIONS.matches(request.getMethod())
//                 || path.startsWith("/users/login")
//                 || path.startsWith("/users/register")
//                 || path.startsWith("/swagger-ui/")
//                 || path.startsWith("/v3/api-docs")
//                 || path.startsWith("/h2")) {
//             filterChain.doFilter(request, response);
//             return;
//         }

//         String header = request.getHeader("Authorization");
//         if (header == null || header.isBlank()) {
//             response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//             return;
//         }

//         String prefix = "Bearer ";
//         String token = header.startsWith(prefix) ? header.substring(prefix.length()) : header;

//         if (!jwtUtils.validateJwtToken(token)) {
//             response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//             return;
//         }

//         // Spring auth stuff please work
//         String email = jwtUtils.getEmailFromJwtToken(token);
//         UsernamePasswordAuthenticationToken authToken =
//                 new UsernamePasswordAuthenticationToken(email, null, List.of());
//         SecurityContextHolder.getContext().setAuthentication(authToken);

//         filterChain.doFilter(request, response);
//     }
// }

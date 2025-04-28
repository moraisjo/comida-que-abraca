package comidaqueabraca.backend.service;

import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    // This method finds an user by email, throws an exception in case
    // no user is found for that email and converts UserEntity object
    // into a UserDetails object, which is a Spring Security object
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found with email: " + username));
        return new CustomUserDetails(userEntity);
    }
}

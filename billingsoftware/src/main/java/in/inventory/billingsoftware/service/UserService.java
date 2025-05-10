package in.inventory.billingsoftware.service;

import in.inventory.billingsoftware.io.UserRequest;
import in.inventory.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}

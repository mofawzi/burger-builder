import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(
        // Initial state
        undefined,
        // Action
        {}
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        // Initial state
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        // Action
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id",
        }
      )
    )
      // Should equal the initial state but with token and user id modified
      .toEqual({
        token: "some-token",
        userId: "some-user-id",
        error: null,
        loading: false,
        authRedirectPath: "/",
      });
  });
});

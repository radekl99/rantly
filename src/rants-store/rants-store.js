import { postRants } from "../firebase/postRant";
import uniqid from "uniqid";
import { updateUsers } from "../firebase/postUserData";
import { updateUserData } from "../firebase/updateUserData";

const initialState = { rants: [], users: [], userData: {} };

const rantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA": {
      const newUserData = { ...action.payload };
      return { ...state, userData: { ...newUserData } };
    }
    case "UPDATE_USER_DATA": {
      const newUserData = { ...state.userData };
      const {
        photoURL: newPhotoURL,
        username: newUsername,
        about: newAbout,
      } = action.payload;

      newPhotoURL && (newUserData.photoURL = newPhotoURL);
      newUsername && (newUserData.username = newUsername);
      newAbout !== state.userData.about && (newUserData.about = newAbout);

      const newUsers = [...state.users];
      const updatedUserIndex = newUsers.findIndex(
        (user) => user.userId === state.userData.userId
      );

      newUsers[updatedUserIndex] = newUserData;

      updateUserData(newPhotoURL, newUsername, state.userData);
      updateUsers(newUsers);

      return { ...state, users: newUsers, userData: { ...newUserData } };
    }
    case "SET_USERS": {
      const newUsers = [...action.payload];
      return { ...state, users: newUsers };
    }
    case "FOLLOW": {
      const followedUser = state.users.find(
        (user) => user.userId === action.payload.userId
      );

      if (!followedUser.followers) {
        followedUser["followers"] = [state.userData.userId];
      } else {
        followedUser.followers.push(state.userData.userId);
      }

      const newFollows = state.userData.follows.concat(action.payload.userId);
      const newUserData = { ...state.userData, follows: newFollows };

      const followedUserIndex = state.users.findIndex(
        (user) => user.userId === action.payload.userId
      );
      const userIndex = state.users.findIndex(
        (user) => user.userId === state.userData.userId
      );

      const newUsers = [...state.users];
      newUsers[followedUserIndex] = followedUser;
      newUsers[userIndex] = newUserData;

      updateUsers(newUsers);

      return { ...state, userData: newUserData, users: newUsers };
    }
    case "UNFOLLOW": {
      const unfollowedUser = state.users.find(
        (user) => user.userId === action.payload.userId
      );

      unfollowedUser.followers = unfollowedUser.followers.filter(
        (follower) => follower !== state.userData.userId
      );

      const newFollows = state.userData.follows.filter(
        (follow) => follow !== action.payload.userId
      );
      const newUserData = { ...state.userData, follows: newFollows };

      const unfollowedUserIndex = state.users.findIndex(
        (user) => user.userId === action.payload.userId
      );
      const userIndex = state.users.findIndex(
        (user) => user.userId === state.userData.userId
      );

      const newUsers = [...state.users];
      newUsers[unfollowedUserIndex] = unfollowedUser;
      newUsers[userIndex] = newUserData;

      updateUsers(newUsers);

      return { ...state, userData: newUserData, users: newUsers };
    }

    case "ADD_RANT": {
      const { rant } = action.payload;
      const newRant = {
        rant: rant,
        userId: state.userData.userId,
        comments: [],
        rantId: uniqid("rant-"),
        likes: [],
      };

      const newRantsList = [...state.rants];
      newRantsList.unshift(newRant);
      postRants(newRantsList);
      return { ...state, rants: newRantsList };
    }
    case "LIKE_RANT": {
      const newRantsList = [...state.rants];
      const likedRant = newRantsList.find(
        (rant) => rant.rantId === action.payload
      );

      if (!likedRant.likes) {
        likedRant["likes"] = [state.userData.userId];
      } else {
        likedRant.likes.push(state.userData.userId);
      }

      postRants(newRantsList);

      return { ...state, rants: newRantsList };
    }
    case "UNLIKE_RANT": {
      const newRantsList = [...state.rants];
      const unlikedRant = newRantsList.find(
        (rant) => rant.rantId === action.payload
      );

      unlikedRant.likes = unlikedRant.likes.filter(
        (like) => like !== state.userData.userId
      );

      postRants(newRantsList);

      return { ...state, rants: newRantsList };
    }
    case "ADD_COMMENT": {
      const commentedRantIndex = state.rants.findIndex(
        (rant) => rant.rantId === action.payload.id
      );
      const { comment } = action.payload;
      const newRants = [...state.rants];

      newRants[commentedRantIndex].comments.unshift({
        rantId: action.payload.id,
        userId: state.userData.userId,
        comment,
        commentId: uniqid("comment-"),
        likes: [],
      });

      postRants(newRants);

      return { ...state, rants: newRants };
    }
    case "LIKE_COMMENT": {
      const newRantsList = [...state.rants];

      const likedComment = newRantsList
        .find((rant) => rant.rantId === action.payload.rantId)
        .comments.find(
          (comment) => comment.commentId === action.payload.commentId
        );

      if (!likedComment.likes) {
        likedComment["likes"] = [state.userData.userId];
      } else {
        likedComment.likes.push(state.userData.userId);
      }

      postRants(newRantsList);

      return { ...state, rants: newRantsList };
    }
    case "UNLIKE_COMMENT": {
      const newRantsList = [...state.rants];

      const unlikedComment = newRantsList
        .find((rant) => rant.rantId === action.payload.rantId)
        .comments.find(
          (comment) => comment.commentId === action.payload.commentId
        );

      unlikedComment.likes = unlikedComment.likes.filter(
        (like) => like !== state.userData.userId
      );

      postRants(newRantsList);

      return { ...state, rants: newRantsList };
    }
    case "SET_RANTS": {
      const newRants = action.payload.rants;
      newRants.forEach((rant) => {
        if (!rant.comments) {
          rant["comments"] = [];
        }
      });
      return { ...state, rants: newRants };
    }
    default: {
      return state;
    }
  }
};

export default rantsReducer;

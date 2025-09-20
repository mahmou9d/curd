import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshAccessToken } from "./authSlice";
const initialState = { records: [], loading: false, error: null, record: null };



// ================== fetch all posts ==================
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const token = getState().auth.access;

    let url = `https://projects-production-9397.up.railway.app/api/task/all/`;
    let options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    try {
      let res = await fetch(url, options);

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          const newToken = refreshRes.access;

          res = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } catch (refreshErr) {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) throw new Error("Failed to fetch posts");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================== fetch single post ==================
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const token = getState().auth.access;

    let url = `https://projects-production-9397.up.railway.app/api/task/get/${id}`;
    let options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // body: JSON.stringify({ task_id: id }),
    };

    try {
      let res = await fetch(url, options);

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          const newToken = refreshRes.access;

          res = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } catch (refreshErr) {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) throw new Error("Failed to fetch post");
      const data=res.json();
      return data
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================== insert post ==================
export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (newPost, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const token = getState().auth.access;

    let url = `https://projects-production-9397.up.railway.app/api/task/add/`;
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(newPost),
    };

    try {
      let res = await fetch(url, options);

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          const newToken = refreshRes.access;

          res = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } catch {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) throw new Error("Failed to insert post");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================== edit post ==================
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const token = getState().auth.access;
console.log(data)
    let url = `https://projects-production-9397.up.railway.app/api/task/edit/${data.id}`;
    let options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
    };

    try {
      let res = await fetch(url, options);

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          const newToken = refreshRes.access;

          res = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } catch {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) throw new Error("Failed to edit post");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================== delete post ==================
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const token = getState().auth.access;

    let url = `https://projects-production-9397.up.railway.app/api/task/delete/`;
    let options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ task_id: id }),
    };

    try {
      let res = await fetch(url, options);

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          const newToken = refreshRes.access;

          res = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } catch {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) throw new Error("Failed to delete post");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================== toggle post ==================
// export const togglePostCompleted = createAsyncThunk(
//   "posts/togglePost",
//   async (id, thunkAPI) => {
//     const { rejectWithValue, getState, dispatch } = thunkAPI;
//     const token = getState().auth.access;

//     let url = `https://projects-production-9397.up.railway.app/api/task/complete/`;
//     let options = {
//       method: "PATCH",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: JSON.stringify({ task_id: id }),
//     };

//     try {
//       let res = await fetch(url, options);

//       if (res.status === 401) {
//         try {
//           const refreshRes = await dispatch(refreshAccessToken()).unwrap();
//           const newToken = refreshRes.access;

//           res = await fetch(url, {
//             ...options,
//             headers: {
//               ...options.headers,
//               Authorization: `Bearer ${newToken}`,
//             },
//           });
//         } catch {
//           return rejectWithValue("Session expired, please login again.");
//         }
//       }

//       if (!res.ok) throw new Error("Failed to toggle post");
//       const data = await res.json();

//       // لو السيرفر بيرجع الـ task كاملة:
//       return { id, completed: data.completed };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const togglePostCompleted = createAsyncThunk(
  "posts/togglePost",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const token = getState().auth.access;

    let url = `https://projects-production-9397.up.railway.app/api/task/complete/`;
    let options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ task_id: id }),
    };

    try {
      let res = await fetch(url, options);

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          const newToken = refreshRes.access;

          res = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } catch {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) throw new Error("Failed to toggle post");

      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================== Slice ==================
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPost
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload.tasks;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // insertPost
      .addCase(insertPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertPost.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.records)) {
          state.records.push(action.payload);
        } else {
          state.records = [action.payload];
        }
      })
      .addCase(insertPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deletePost
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter((el) => el.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // editPost
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // togglePostCompleted
      .addCase(togglePostCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePostCompleted.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.records)) {
          const { id } = action.payload;
          const post = state.records.find((el) => el.id === id);
          if (post) {
            post.completed = !post.completed;
          }
        }
      })

      .addCase(togglePostCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;

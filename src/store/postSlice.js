import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null, record: null };

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `https://projects-production-be11.up.railway.app/api/getusertasks/${id}?format=json`
      );
      const data = await res.json();
      console.log(data,"ghdkfjhf,l")
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `https://projects-production-be11.up.railway.app/api/task/${id}?format=json`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        `https://projects-production-be11.up.railway.app/api/tasky/delete/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(JSON.stringify(item), "jlgjnfeq");
    if (!item.title) return rejectWithValue("Message is required");
    const payload = {
      title: item.title,
      description: item.description,
      user_id: item.user_id,
    };

    try {
      const res = await fetch(
        "https://projects-production-be11.up.railway.app/api/tasks/add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error("Error response from server:", data);
        const errMsg = data?.message || JSON.stringify(data) || "Server error";
        return rejectWithValue(errMsg);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const togglePostCompleted = createAsyncThunk(
  "posts/togglePostCompleted",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      const post = getState().posts.records.find((item) => item.id === id);

      if (!post) {
        throw new Error("Post not found");
      }
      const newCompleted = !post.completed;

      const res = await fetch(
        `https://projects-production-be11.up.railway.app/api/tasky/complete/${id}?format=json`,
        {
          method: "PATCH",
          body: JSON.stringify({ completed: newCompleted }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to toggle completed");
      }

      const data = await res.json();
      return { id, completed: data.completed ?? newCompleted };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, ...item }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("Editing post with data:", item);

    try {
      const res = await fetch(
        `https://projects-production-be11.up.railway.app/api/tasky/edit/${id}?format=json`,
        {
          method: "PATCH",
          body: JSON.stringify(item),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to edit post");
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: {
    //get post
    [fetchPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //fetch posts
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //create post
    [insertPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [insertPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    },
    [insertPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //delete post
    [deletePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //edit post
    [editPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ✅ togglePostCompleted
    [togglePostCompleted.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [togglePostCompleted.fulfilled]: (state, action) => {
      state.loading = false;
      const { id, completed } = action.payload;
      const post = state.records.find((el) => el.id === id);
      if (post) post.completed = completed;
    },
    [togglePostCompleted.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Api";
const authdata = JSON.parse(localStorage.getItem("Blendtwo_admin"));
const headers = { headers: { apikey: authdata?.apikey, token: authdata?.token } };
const config = { ...headers };
export const GetIntrest = createAsyncThunk("Contentmanage/getintrest", async (count) => {
  try {
    const data = await axios.get(`${BaseUrl}/api/content/interest-list?count=${count}`, config);
    return data.data;
  } catch (error) {
    throw error;
  }
});


export const IntrestCategoryActions = createAsyncThunk("Contentmanage/IntrestCategory", async (interestdata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/content/add-edit-category`,interestdata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
});

export const AddNewsubIntrest = createAsyncThunk("Contentmanage/addsubintrest", async (interestdata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/content/add-interest`,interestdata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
});

export const DeleteIntrest = createAsyncThunk("Contentmanage/deleteintrest", async (id) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/content/delete-interest`,id, config);
    return data.data;
  } catch (error) {
    throw error;
  }
});

// -------------------------------- Prompt -----------------------

export const Prompt_Listing  = createAsyncThunk("Contentmanage/getprompt", async (count) => {
  try {
    const data = await axios.get(`${BaseUrl}/api/content/prompt-list?count=${count}`, config);
    return data.data;
  } catch (error) {
    throw error;
  }
});

export const HandeldPrompts = createAsyncThunk("Contentmanage/handeldprompts", async (promptdata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/content/add-edit-prompt`,promptdata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})

// ------------------------------- - Language - ----------------------

export const Language_Listing  = createAsyncThunk("Contentmanage/getLanguage", async (count) => {
  try {
    const data = await axios.get(`${BaseUrl}/api/lang/get-lang`, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})

export const HandeldLanguage = createAsyncThunk("Contentmanage/handeldlanguage", async (Languagedata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/lang/edit-delete-lang`,Languagedata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})

export const AddLanguage = createAsyncThunk("Contentmanage/addlanguage", async (Languagedata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/lang/add`,Languagedata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})
// ------------------------------- - Religion - ----------------------

export const  Religione_Listing  = createAsyncThunk("Contentmanage/getreligione", async (count) => {
  try {
    const data = await axios.get(`${BaseUrl}/api/religion/get-religion`, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})

export const HandeldReligione = createAsyncThunk("Contentmanage/handeldreligione", async (Religiondata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/religion/edit-delete-religion`,Religiondata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})

export const AddReligione = createAsyncThunk("Contentmanage/addreligione", async (Religiondata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/religion/add`,Religiondata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})


// ----------- Get PrivacyandTermsConditiondata --------------

export const GetPrivacyandTermsConditiondata = createAsyncThunk("Contentmanage/getprivacytermsconditions", async (promptdata) => {
  try {
    const data = await axios.get(`${BaseUrl}/api/content/get-general-docs`,config);
    return data.data;
  } catch (error) {
    throw error;
  }
})
// ----------- Get PrivacyandTermsConditiondata --------------

export const GetContactusdata = createAsyncThunk("Contentmanage/contactusdata", async (count) => {
  try {
    const data = await axios.get(`${BaseUrl}/api/content/get-contactus-list?count=${count}`,config);
    return data.data;
  } catch (error) {
    throw error;
  }
})
// ----------- UpadtePrivacyandTermsConditiondata --------------
export const UpadtePrivacyandTermsConditiondata = createAsyncThunk("Contentmanage/updateprivacytermsconditions", async (contentdata) => {
  try {
    const data = await axios.post(`${BaseUrl}/api/content/update-general-docs`,contentdata, config);
    return data.data;
  } catch (error) {
    throw error;
  }
})
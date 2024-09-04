import { createSlice } from "@reduxjs/toolkit";
import {
  AddIntrest,
  AddLanguage,
  AddNewsubIntrest,
  AddReligione,
  GetContactusdata,
  GetIntrest,
  GetPrivacyandTermsConditiondata,
  HandeldLanguage,
  HandeldPrompts,
  HandeldReligione,
  IntrestCategoryActions,
  Language_Listing,
  Prompt_Listing,
  Religione_Listing,
  UpadtePrivacyandTermsConditiondata,
} from "./ContentManage.action";

let initialState = {
  loading: false,
  error: null,
  Interest: {},
  prompts: {},
  privacypolicy:"",
  termsandconditions:"",
  Language:{},
  Religion:{},
  contactus:{}
};

const ContentManageSlice = createSlice({
  name: "Contentmanage",
  initialState,
  extraReducers: (builder) => {
    // --------- Get Interest  ---------
    builder
      .addCase(GetIntrest.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetIntrest.fulfilled, (state, action) => {
        state.loading = false;
        state.Interest = action?.payload;
      })
      .addCase(GetIntrest.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // --------- Conatact us   ---------
    builder
      .addCase(GetContactusdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetContactusdata.fulfilled, (state, action) => {
        state.loading = false;
        state.contactus = action?.payload;
      })
      .addCase(GetContactusdata.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

    // --------- Get Interest  ---------
    builder
      .addCase(AddNewsubIntrest.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNewsubIntrest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddNewsubIntrest.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

    // --------- Add Update Interest Category ---------
    builder
      .addCase(IntrestCategoryActions.pending, (state) => {
        state.loading = true;
      })
      .addCase(IntrestCategoryActions.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(IntrestCategoryActions.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

    // ---------  Prompt   ---------
    builder
      .addCase(Prompt_Listing.pending, (state) => {
        state.loading = true;
      })
      .addCase(Prompt_Listing.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action?.payload;
      })
      .addCase(Prompt_Listing.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // ---------   Add New Prompt   ---------
    builder
      .addCase(HandeldPrompts.pending, (state) => {
        state.loading = true;
      })
      .addCase(HandeldPrompts.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(HandeldPrompts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

       // ---------   Language   ---------
 
    builder
    .addCase(Language_Listing.pending, (state) => {
      state.loading = true;
    })
    .addCase(Language_Listing.fulfilled, (state, action) => {
      state.loading = false;
      state.Language = action?.payload;
    })
    .addCase(Language_Listing.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    // ---------  Add New Language  ---------
    builder
      .addCase(AddLanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddLanguage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddLanguage.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });


    // ---------   Edit Delete Language   ---------
    builder
      .addCase(HandeldLanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(HandeldLanguage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(HandeldLanguage.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
       // ---------    religion   ---------
 
    builder
    .addCase(Religione_Listing.pending, (state) => {
      state.loading = true;
    })
    .addCase(Religione_Listing.fulfilled, (state, action) => {
      state.loading = false;
      state.Religion = action?.payload;
    })
    .addCase(Religione_Listing.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    // ---------  Add New religion  ---------
    builder
      .addCase(AddReligione.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddReligione.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddReligione.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

    // ---------   Edit Delete religion   ---------
    builder
      .addCase(HandeldReligione.pending, (state) => {
        state.loading = true;
      })
      .addCase(HandeldReligione.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(HandeldReligione.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });


    // ---------   Get Privacy policy and Terms and Condtions    ---------
    builder
      .addCase(GetPrivacyandTermsConditiondata.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPrivacyandTermsConditiondata.fulfilled, (state, action) => {
        state.loading = false;
state.privacypolicy=action?.payload?.r?.privacy_policy;
state.termsandconditions=action?.payload?.r?.terms_condition
      })
      .addCase(GetPrivacyandTermsConditiondata.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

    // ---------   Update Privacy policy and Terms and Condtions    ---------
    builder
      .addCase(UpadtePrivacyandTermsConditiondata.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpadtePrivacyandTermsConditiondata.fulfilled, (state, action) => {
        state.loading = false;

      })
      .addCase(UpadtePrivacyandTermsConditiondata.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default ContentManageSlice.reducer;

import axios from './axios';

const USAGE_POLICIES_URL = '/admin/usage-policies';

export const getUsagePolicies = async () => {
  try {
    const response = await axios.get(USAGE_POLICIES_URL);
    return response.data.data; // Assuming data is nested under .data.data
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const createUsagePolicy = async (policyData) => {
  try {
    const response = await axios.post(USAGE_POLICIES_URL, policyData);
    return response.data.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const updateUsagePolicy = async (policyId, policyData) => {
  try {
    const response = await axios.put(`${USAGE_POLICIES_URL}/${policyId}`, policyData);
    return response.data.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const deleteUsagePolicy = async (policyId) => {
  try {
    const response = await axios.delete(`${USAGE_POLICIES_URL}/${policyId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

import provinces from "../data/province.json"
import districts from "../data/district"
import wards from "../data/ward"


export const fetchProvinces = async () => {
	return await Object.values(provinces);
  };
  
  export const fetchDistricts = async (provinceCode) => {
	let data = await Object.values(districts);
  	return data.filter((item) => item.parent_code === provinceCode);
  };
  
  export const fetchWards = async (districtCode) => {
	let data = await Object.values(wards);
	return data.filter((item) => item.parent_code === districtCode);
  };
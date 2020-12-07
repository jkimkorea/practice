package com.test.service;

import java.util.List;
import java.util.Map;

import com.test.domain.AccountVO;
import com.test.domain.CustomListVO;
import com.test.dto.CustomDTO;

public interface CustomService {

	public void register(CustomDTO dto) throws Exception;
	
	public CustomDTO searchByBusi_num(String busi_num) throws Exception;
	
	public List<CustomListVO> search(CustomListVO vo) throws Exception;
	
	public void delete(String busi_num) throws Exception;
	
	public List<CustomListVO> readList() throws Exception;
	
	public void change(CustomDTO dto) throws Exception;
	
	
}

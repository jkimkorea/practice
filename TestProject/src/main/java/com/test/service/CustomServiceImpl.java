package com.test.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.dao.CustomDAO;
import com.test.domain.AccountVO;
import com.test.domain.CustomListVO;
import com.test.dto.CustomDTO;

@Service
public class CustomServiceImpl implements CustomService{

	@Inject
	private CustomDAO dao;

	@Transactional
	@Override
	public void register(CustomDTO dto) throws Exception {
		dao.register(dto);
		dao.account(dto);
	}

	@Override
	public CustomDTO searchByBusi_num(String busi_num) throws Exception {
		return dao.searchByBusi_num(busi_num);
	}

	@Override
	public void delete(String busi_num) throws Exception {
		dao.delete(busi_num);
	}

	@Override
	public List<CustomListVO> readList() throws Exception {
		return dao.readList();
	}

	@Transactional
	@Override
	public void change(CustomDTO dto) throws Exception {
		dao.change(dto);
		dao.updateAccount(dto);
	}

	@Override
	public List<CustomListVO> search(CustomListVO vo) throws Exception {
		return dao.search(vo);
	}


}

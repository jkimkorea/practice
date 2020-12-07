package com.test.dao;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.test.domain.AccountVO;
import com.test.domain.CustomListVO;
import com.test.dto.CustomDTO;

@Repository
public class CustomDAOImpl implements CustomDAO {
	private static final Logger logger = LoggerFactory.getLogger(CustomDAOImpl.class);
	@Inject
	private SqlSession session;
	
	private final static String NS="com.test.mapper.Custom_Mapper";
	

	@Override
	public void register(CustomDTO dto) throws Exception {
		logger.info("===================DAO execute()================="+dto);
		session.insert(NS+".registering", dto);
	}

	@Override
	public void account(CustomDTO dto) throws Exception {
		session.insert(NS+".account", dto);
	}

	@Override
	public CustomDTO searchByBusi_num(String busi_num) throws Exception {
		return session.selectOne(NS+".searchByBusi_num",busi_num);
	}


	@Override
	public void delete(String busi_num) throws Exception {
		session.delete(NS+".delete", busi_num);
	}

	@Override
	public List<CustomListVO> readList() throws Exception {
		return session.selectList(NS+".readList");
	}

	@Override
	public void change(CustomDTO dto) throws Exception {
		session.update(NS+".change", dto);
	}

	@Override
	public List<CustomListVO> search(CustomListVO vo) throws Exception {
		return session.selectList(NS+".search", vo);
	}

	@Override
	public void updateAccount(CustomDTO dto) throws Exception {
		session.update(NS+".updateAccount", dto);
	}
	
}

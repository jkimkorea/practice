package com.test.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.domain.AccountVO;
import com.test.domain.CustomListVO;
import com.test.dto.CustomDTO;
import com.test.dto.DateDTO;
import com.test.service.CustomService;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping("/custom/*")
public class CustomController {
	
	@Inject
	private CustomService service;
	
	private static final Logger logger = LoggerFactory.getLogger(CustomController.class);
	
	@RequestMapping(value = "register",method=RequestMethod.POST)
	public String register(CustomDTO dto,DateDTO date) throws Exception {
			logger.info("==============register() execute===============");
			logger.info("===============dto:"+dto);
			if(dto.getSpecial_relation()==null) {
				dto.setSpecial_relation("n");
			}
			if(dto.getTrade_stop()==null) {
				dto.setTrade_stop("n");
			}
			String contract_s=date.getContract_s();
			String contract_e=date.getContract_e();
			SimpleDateFormat beforeFormat = new SimpleDateFormat("yyyy-mm-dd");
			DateFormat afterFormat  = new SimpleDateFormat("yyyy-MM-dd");
			
			Date tempDate =beforeFormat.parse(contract_s);
			Date tempDate2=afterFormat.parse(contract_e);
			dto.setContract_period_s(tempDate);
			dto.setContract_period_e(tempDate2);

			service.register(dto);
		
		return "redirect:/";
	}
	
	@RequestMapping(value = "update",method=RequestMethod.POST)
	public String update(CustomDTO dto,DateDTO date,String busi_num,Model model) throws Exception {
		
		logger.info("==============update() execute===============");
		logger.info("==============dto:"+dto);
		if(dto.getSpecial_relation()==null) {
			dto.setSpecial_relation("n");
		}
		if(dto.getTrade_stop()==null) {
			dto.setTrade_stop("n");
		}
		
		String contract_s = date.getContract_s();
		String contract_e = date.getContract_e();
		SimpleDateFormat Format = new SimpleDateFormat("yyyy-mm-dd");
		
		Date tempDate = Format.parse(contract_s);
		Date tempDate2 = Format.parse(contract_e);
		
		dto.setContract_period_s(tempDate);
		dto.setContract_period_e(tempDate2);
		dto.setBusi_num(busi_num);
		service.change(dto);
		
		Date datetemp_s =dto.getContract_period_s();
		Date datetemp_e =dto.getContract_period_e();
		String date_s = Format.format(datetemp_s);
		String date_e= Format.format(datetemp_e);
		model.addAttribute("date_s", date_s);
		model.addAttribute("date_e", date_e);

		AccountVO vo=new AccountVO();
		vo.setBusi_num(busi_num);
		vo.setCustom(dto.getCustom());
		model.addAttribute("vo", service.searchByBusi_num(busi_num));
		
		return "/home2";
	}
	
	@RequestMapping(value = "search",method=RequestMethod.GET)
	public String search(CustomListVO vo,Model model) throws Exception{
		logger.info("==============search() execute===============");
		logger.info("================vo:"+vo);
		model.addAttribute("list",service.search(vo));
		
		return "/home2";
	}
	
	@RequestMapping(value = "search_by_busi_num",method=RequestMethod.GET)
	public String searchByBusi_num(@RequestParam("busi_num") String busi_num,Model model) throws Exception {
		logger.info("====================searchByBusi_num()======================");
		
		AccountVO vo = new AccountVO();
		vo.setBusi_num(busi_num);
		
		CustomDTO dto=service.searchByBusi_num(busi_num);
		model.addAttribute("vo",dto);
		logger.info("====================dto:"+dto);
		
		DateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date datetemp_s =dto.getContract_period_s();
		Date datetemp_e =dto.getContract_period_e();
		String date_s = sdFormat.format(datetemp_s);
		String date_e= sdFormat.format(datetemp_e);
		model.addAttribute("date_s", date_s);
		model.addAttribute("date_e", date_e);
		
		return "/home2";
	}
	
	@ResponseBody
	@RequestMapping(value = "delete",method=RequestMethod.POST)
	public void delete(String busi_num,Model model) throws Exception{
		logger.info("==========delete================");
		logger.info("==================busi_num:"+busi_num);
		
		service.delete(busi_num);
		List<CustomListVO> list = service.readList();
		model.addAttribute("vo", list);
	}
}

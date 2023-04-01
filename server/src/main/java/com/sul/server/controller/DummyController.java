package com.sul.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DummyController {
	
	@RequestMapping("/dummy.do")
	public String dummy(){
		return "dummy";
	}
}

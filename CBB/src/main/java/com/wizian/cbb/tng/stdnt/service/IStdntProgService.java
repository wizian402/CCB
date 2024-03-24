package com.wizian.cbb.tng.stdnt.service;

import java.util.List;
import java.util.Map;

public interface IStdntProgService {
	List<Map<String, Object>> selectTngStdnt(String loginId);
}

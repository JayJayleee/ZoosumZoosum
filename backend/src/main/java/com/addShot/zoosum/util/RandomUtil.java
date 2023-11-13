package com.addShot.zoosum.util;

import java.util.List;
import java.util.Random;

public class RandomUtil {

	private static final Random RANDOM = new Random();

	private RandomUtil() {}

	public static <T> T getRandomElement(List<T> list) {
		return list.get(RANDOM.nextInt(list.size()));
	}

}

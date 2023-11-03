package com.addShot.zoosum.util;

import com.addShot.zoosum.entity.embedded.DivideTime;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class TimeUtil {

	public static DivideTime getTime(int time) {
		int hour = 0, minute = 0, second = 0;

		if(time>=3600) {
			hour = time / 3600;
			time = time % 3600;
			minute = time / 60;
			time = time % 60;
			second = time;
		}
		else if(time>=60) {
			minute = time / 60;
			time = time % 60;
			second = time;
		}
		else {
			second = time;
		}

		DivideTime divideTime = new DivideTime(hour, minute, second);
		return divideTime;
	}
}

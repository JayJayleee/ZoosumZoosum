package com.addShot.zoosum.domain.activity.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponseDtoAndSize {

    private List<ActivityResponseDto> content;
    private int size;

}

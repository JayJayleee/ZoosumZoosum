package com.addShot.zoosum.util.s3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.url}")
    private String URL;

    private final AmazonS3 amazonS3;

    // 경매상품 추가시 사진을 DB와 S3에 모두 저장
    public String S3ImageUploadToAWS(MultipartFile file, String dirName, String userId) {
        String originName = file.getOriginalFilename();
        String key = dirName + userId + "/" + originName;
        log.info("key: {}", key);

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            // PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
            // request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크
            PutObjectResult result = amazonS3.putObject(bucket, key, file.getInputStream(), metadata);
            log.info("result: {}", result);

            return amazonS3.getUrl(bucket, key).toString();
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            log.error("uploadToAWS AmazonServiceException filePath={}, yyyymm={}, error={}", e.getMessage());
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        } catch (Exception e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        }
        return URL + key;
    }
}

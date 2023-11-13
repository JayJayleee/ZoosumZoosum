package com.addShot.zoosum.util.s3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.imageio.ImageIO;
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
        String path = dirName + userId + "/" + originName;
        log.info("path: {}", path);

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            String contentType = "image/" + originName.substring(originName.lastIndexOf("." ) + 1);
            metadata.setContentType(contentType);
            metadata.setContentLength(file.getSize());

            amazonS3.putObject(new PutObjectRequest(bucket, path, file.getInputStream(), metadata));
            return amazonS3.getUrl(bucket, path).toString();
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
        return URL + path;
    }

    //나무인증서 이미지 저장
    public String uploadBufferedImageToAWS(BufferedImage image, String dirName, String userId) {

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedNow = now.format(formatter);
        String date = formattedNow.substring(0, 10);
        String time = formattedNow.substring(11, 19);

        String originalName = "tree-" + date + "-" + time;
        String path = dirName + userId + "/" + originalName;
        log.info("path: {}", path);

        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(image, "png", os);
            byte[] buffer = os.toByteArray();
            InputStream is = new ByteArrayInputStream(buffer);

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/png");
            metadata.setContentLength(buffer.length);

            amazonS3.putObject(new PutObjectRequest(bucket, path, is, metadata));
            return amazonS3.getUrl(bucket, path).toString();

        }
        catch (Exception e) {
			e.printStackTrace();
            log.error("Error uploading image: {}", e.getMessage());
            return null;
		}
    }

}

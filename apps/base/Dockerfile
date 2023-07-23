FROM yd-artifact.srdcloud.cn/cq_eda_kg10000-release-docker-virtual/nginx:safe-nginx-1.23.1
COPY ./dist/ /usr/share/nginx/html/
# RUN rm /usr/share/nginx/html/Dockerfile
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo Asia/Shanghai >/etc/timezone
# 使用 node 20 镜像作为构建阶段的基础镜像
FROM node:20-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY ./ .

# 构建项目
RUN npm run build

# 使用 nginx 镜像作为生产阶段的基础镜像
FROM nginx:1.21-alpine as production-stage

# 复制自定义的 Nginx 配置文件
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建后的文件到 Nginx 服务目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

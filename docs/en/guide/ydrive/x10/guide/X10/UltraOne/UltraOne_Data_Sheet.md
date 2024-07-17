# UltraOne Data Sheet


# 1.iocultra.ypcloud.com


```
server {
        server_name iocultra.ypcloud.com
        proxy_connect_timeout   300;
        proxy_send_timeout      300;
        proxy_read_timeout      300;
        send_timeout            300;


        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $host;
                proxy_set_header X-Nginx-Proxy true;


                proxy_pass http://10.36.177.5:8083;


                proxy_http_version 1.1;
                proxy_set_header        Upgrade $http_upgrade;
                proxy_set_header        Connection "upgrade";
        }


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/iocultra.ypcloud.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/iocultra.ypcloud.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = iocultra.ypcloud.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        server_name iocultra.ypcloud.com
        proxy_connect_timeout   300;


    listen 80;
    return 404; # managed by Certbot
}
```


# 2.nginx


```
user www-data;
worker_processes auto;
worker_rlimit_nofile 8192;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;


events {
	use epoll;
	worker_connections 768;
	multi_accept on;
}


http {


	##
	# Basic Settings
	##
	client_max_body_size 4096M;
	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	server_tokens off;


	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;


	include /etc/nginx/mime.types;
	default_type application/octet-stream;


	##
	# SSL Settings
	##


	ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;


	##
	# Logging Settings
	##


	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;


	##
	# Gzip Settings
	##


	gzip on;
	gzip_disable "msie6";
	gzip_vary on;
	gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;


	##
	# Virtual Host Configs
	##


	add_header "X-Content-Type-Options" "nosniff";


	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}


stream {
    # motebus
    server {
        listen 6888  so_keepalive=on;
        tcp_nodelay on;
        proxy_timeout 1d;
        proxy_connect_timeout 30;
        proxy_pass 10.36.177.187:6888;
    }
}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
# 
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}


```


# 3.UltraOne.sh


```
#!/bin/bash
for lxc in {mproxy,mrealm,qbix,cms,minio-s3,apps,ultraport,ultraview}
do
sudo lxc launch ubuntu:20.04 $lxc -c security.nesting=true -c security.privileged=true
echo "Waiting lxc for 30 seconds..."
sleep 30
sudo lxc exec $lxc -- apt-get -y update
sudo lxc exec $lxc -- apt-get -y upgrade 
sudo lxc exec $lxc -- apt-get install -y docker.io
sudo lxc exec $lxc -- apt-get install -y docker-compose
sudo lxc exec $lxc -- wget https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh
sudo lxc exec $lxc -- chmod +x /root/script.deb.sh
sudo lxc exec $lxc -- /root/script.deb.sh
sudo lxc exec $lxc -- apt-get install -y gitlab-runner
sudo lxc exec $lxc -- usermod -aG docker root
sudo lxc exec $lxc -- usermod -aG docker gitlab-runner
sudo lxc exec $lxc -- systemctl enable docker
sudo lxc exec $lxc -- chmod 777 /var/run/docker.sock
echo "$lxc ok!"
done
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NjA0ODI5NjFdfQ==
-->
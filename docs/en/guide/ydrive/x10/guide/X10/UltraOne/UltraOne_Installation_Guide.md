# UltraOne Installation Guide

# A. Install LXD and LXC

```
sudo apt update && sudo apt upgrade -y
sudo snap install lxd
sudo lxd init --minimal
cd ultra
bash ./UltraOne.sh
```

## UltraOne.sh

```powershell
#!/bin/bash
for lxc in {mproxy,mrealm,qbix,cms,minio-s3,apps,}
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

## OTSI.sh

```powershell
#!/bin/bash
for lxc in {iocview,ultraview,ultraport,xview,}
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

# B. LXD Installation

1. **Update the system packages**:
    
    ```
    sudo apt update
    sudo apt upgrade -y
    ```
    
2. **Install LXD using Snap**:
    
    ```
    sudo snap install lxd
    ```
    
3. **Initialize LXD**:This command will guide you through the initial LXD setup. You can accept the default settings or customize them according to your needs.
    
    ```
    sudo lxd init
    ```
    
4. **Verify the LXD installation**:
    
    ```
    lxc list
    ```
    

# C. SSH Installation

**Install SSH (Ubuntu)**

1. Open a terminal.
2. Enter the following command to install the SSH package:

```
apt install openssh-server
```

If there are no error messages, the installation is successful. 

**Configure SSH**

Enter the following command to use the nano text editor to modify some parameters of the SSH package:

```
nano /etc/ssh/sshd_config
```

Change the following three parameters in the file to the following content:

```
Port 22 -> The port used by SSH, it is recommended not to change it
PasswordAuthentication yes
PermitRootLogin yes -> Whether to allow root login
```

Remember to save the file.

**Restart SSH**

Enter the following command to restart the SSH service:

```
/etc/init.d/ssh restart
```

# D. SSH File Transfer

## Windows

1.Download WinSCP

[https://winscp.net/eng/download.php#google_vignette](https://winscp.net/eng/download.php#google_vignette)

2.Enter host name、username、password to connected

3.Pick up you file and upload to system

## Ubuntu

Copy `/path/file1` on the local host to `/path/file2` on the host `192.168.0.1`. The `myuser` account is used to log in to the `192.168.0.1` host:

```
# Copy from local to remote
scp /path/file1 myuser@192.168.0.1:/path/file2
```

Copy `/path/file2` on the remote host to `/path/file1` on the local host. The `myuser` account is used to log in to the `192.168.0.1` host:

```
# Copy from remote to local
scp myuser@192.168.0.1:/path/file2 /path/file1
```

- If the username on the local host is the same as the username on the remote host, the username can be omitted:

```
# Copy from local to remote
scp /path/file1 192.168.0.1:/path/file2

# Copy from remote to local
scp 192.168.0.1:/path/file2 /path/file1
```

# Ngix &Https set up

1.Install Nginx 

```powershell
sudo apt install nginx
```

2.Start Nginx 

```powershell
sudo systemctl start ngin
```

Enter [http://localhost](http://localhost/) to check whether Nginx is successfully started

3.configure nginx

```powershell
cd /etc/nginx/sites-available/
```

```powershell
sudo certbot --nginx -d [agent.ypcloud.com](http://agent.ypcloud.com/)
```

This command uses the certbot tool to obtain a Let's Encrypt SSL certificate for the domain [agent.ypcloud.com](http://agent.ypcloud.com/). The `--nginx` option tells certbot to automatically update the Nginx configuration with the new certificate. The `-d` flag specifies the domain name for which the certificate should be issued.

```powershell
sudo service nginx restart
```

This command restarts the Nginx service, allowing the new SSL certificate configuration to take effect.

```powershell
cd /etc/nginx
```

```powershell
cat nginx.conf
```

This command displays the contents of the main Nginx configuration file, nginx.conf. You can use this to verify that the new SSL certificate configuration has been included in the file.
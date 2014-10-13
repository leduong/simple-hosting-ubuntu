#!/bin/bash
# Script to add a user to Linux system
if [ $(id -u) -eq 0 ]; then
        read -p "Enter username : " username
        read -p "Enter domain : " domain
        read -s -p "Enter password : " password
        egrep "^$username" /etc/passwd >/dev/null
        if [ $? -eq 0 ]; then
                echo "$username exists!"
                exit 1
        else
                pass=$(perl -e 'print crypt($ARGV[0], "password")' $password)
                useradd -m -p $pass $username
                if [ $? -eq 0 ]; then
                        echo "User has been added to system!"
                        sed -e "s/domain/$domain/g" -e "s/username/$username/g" < /root/conf/domain.conf > /etc/nginx/sites-available/$domain
                        sed -e "s/domain/$domain/g" -e "s/username/$username/g" < /root/conf/php.conf > /etc/php5/fpm/pool.d/$username.conf
			ln -sf /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/$domain 
			#Apache a2ensite $domain
			service nginx reload
                        echo "Create database for user: $username, input password root of MySQL"
                        sed -e "s/domain/$domain/g" -e "s/username/$username/g" < /root/conf/mysql.conf > /tmp/$username.sql
                        mysql -uroot -p < /tmp/$username.sql
                        rm -f /tmp/$username.sql
                else
                        echo "Failed to add a user!"
                fi
        fi
else
        echo "Only root may add a user to the system"
        exit 2
fi

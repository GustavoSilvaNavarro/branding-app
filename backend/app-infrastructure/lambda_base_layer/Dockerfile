# FROM amazonlinux:2

# # INSTALLING PYTHON
# RUN yum install -y python37 && \
#     yum install -y python3-pip && \
#     yum install -y zip && \
#     yum clean all

# # SETUP PIP AND VENV
# RUN python3.7 -m pip install --upgrade pip && \
#     python3.7 -m pip install virtualenv
# RUN python3.7 -m venv base
# RUN source base/bin/activate

# # INSTALL DEPENDENCIES
# COPY requirements.txt .
# RUN pip install -r requirements.txt -t ./python

# # ZIP IT UP FOR DEPLOYMENT
# RUN zip -r layer.zip ./python/
# ENTRYPOINT [ "/bin/bash", "-l" ]

FROM ubuntu:focal

# UPDATE AND UPGRADE UBUNTU PACKAGES
RUN apt update
RUN apt upgrade

# # INSTALLING PYTHON
RUN apt install -y zip
RUN apt install -y python3.9
RUN apt install -y python3-pip

# GET ENV AND UPDAING PIP
RUN python3.9 -m pip install --upgrade pip && \
    python3.9 -m pip install virtualenv && \
    apt install python3.9-venv

# SETUP PIP AND VENV
RUN python3.9 -m venv base
COPY requirements.txt .
RUN . base/bin/activate && \
    pip install -r requirements.txt -t ./python

# ZIP IT UP FOR DEPLOYMENT
RUN zip -r layer.zip ./python/

ENTRYPOINT [ "/bin/bash", "-l" ]

import boto
import mimetypes
import json
from django.http import HttpResponse

import os
from dotenv import load_dotenv
load_dotenv()

...
 
conn = boto.connect_s3(os.getenv("AWSAccessKeyId"), os.getenv("AWSSecretKey"))
 
def sign_s3_upload(request):
    print("===== sign api called =======")
    object_name = request.GET['objectName']
    content_type = mimetypes.guess_type(object_name)[0]
 
    signed_url = conn.generate_url(
        300,
        "PUT",
        os.getenv("Bucket"),
        object_name,
        headers = {'Content-Type': content_type, 'x-amz-acl':'public-read'})
 
    return HttpResponse(json.dumps({'signedUrl': signed_url}))
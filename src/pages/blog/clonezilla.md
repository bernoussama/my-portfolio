---
layout: ../../layouts/PostLayout.astro
title: "How to Clone a Disk Using Clonezilla: A Step-by-Step Guide"
pubDate: 2022-08-02
description: "Effortlessly Clone Your Hard Drive with Clonezilla: A Detailed Guide"
author: "Oussama Bernou"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "The full Astro logo."
tags: ["clonezilla", "blogging", "learning in public", "disk cloning" ]
---
# Introduction

Disk cloning is a crucial process for anyone looking to upgrade their storage, create backups, or transfer data to a new hard drive. Clonezilla, a powerful and free disk cloning software, makes this task straightforward and efficient. In this guide, we will walk you through the step-by-step process of cloning a disk using Clonezilla. Whether you're a seasoned IT professional or a beginner, this tutorial will help you ensure a smooth and successful disk cloning experience. Let's get started!

## Preparing for Disk Cloning

### Prerequisites

* Old hard disk
    
* New hard disk
    
* CloneZilla ISO
    
* USB stick
    

> ### Make sure to back up important data before proceeding, in case of failure.
> 
> Will be making a blog post about making backups using syncthing soon. Stay tuned

### Downloading Clonezilla

* [download link ](https://clonezilla.org/downloads/download.php?branch=stable)
    

### Creating a Bootable Clonezilla USB Drive

* In Linux
    

```bash
sudo dd if=path/to/clonezilla_iso of=/path/to/disk bs=1M status=progress
```

if this didn't work install and use [Balena Etcher ](https://github.com/balena-io/etcher/releases)

* In Windows, use [Rufus ](https://rufus.ie/en/).
    

## Cloning the disk

Now we will insert the disk we burned the ISO onto and boot from it.

After booting from the USB, you should see the screen below.

* choose the first live option.
    

![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721756038331/dd4b3d02-d479-4888-8b08-46a98fa52f66.png )

* choose language and keyboard layout.
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721756249756/a71f9c46-f8fd-4d59-b6d0-fc0fe5581217.jpeg )
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721756289158/1fdde431-b625-492f-9aab-e691fef02b62.png )
    
    * choose `start clonezilla`
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721756346220/23ee57f5-ff30-4473-9489-2e59e80fcbb8.png )
    
    * Since we are going to clone disk to disk, we should choose the `device-device` option.
        
* ![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721756820147/d001de3c-11e8-4980-a18b-41f1f4cafb29.png )
    
    We will use Beginner mode since we are just starting out.
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721756916070/7cfce322-2e2d-4a32-bc7b-10f3c78051a3.png )
    
    * we want to clone the whole disk so we should choose `disk_to_local_disk`
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721756976828/ce7895b1-6b22-4ed9-8d23-45b6e4a2599a.png )
    
* Now we arrive at the most critical part: choosing the source disk and the destination disk. If we mix them up, we could end up with two empty disks. So, we need to pay close attention.
    
     to differentiate the disks if they are the same model, go to the disk utility of your operating system and look for properties of each one, you should find something to differentiate between them.
     
     Ex: in windows the disk where it is installed is disk 0
     
     ![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721757710104/3116f6a1-300d-492c-a5d5-a2c8f0516bcd.png )
     
     * and in the details pane chose hardware Ids property
         
     
     ![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721757732337/7b703333-8507-4bd0-b695-66c1e68f1b53.png )
     
     * *the name that keeps repeating is the disk ID; it's also the one shown in Clonezilla*
         
     
     ![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721757790075/f8098fe1-ec21-42b6-bcd4-c3d34a420bd1.png )
     
     * if you do the same thing for the other disk you should find another Id.
         
         And that's how you differentiate between the 2.
             
        
    * First, we choose the source disk.
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721757086913/21368562-82f8-4e20-a460-31a12e12e2a9.png )
    
    * We are going to skip file system checks because the source disk is working well.
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721758060597/4f95e0f7-7409-4522-a458-1c1d2271e289.png )
    
    * We choose what CloneZilla will do when it finishes.
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721758133620/49cee826-1b40-4f7e-adc2-d4b0a7f0b7e5.png )
    
    * Last chance to check if you mixed up the two disks. Type `y` if you are sure you did everything correctly.
        
    
![test](https://cdn.hashnode.com/res/hashnode/image/upload/v1721758262116/4578b1be-06d2-4d24-957e-7012bfe6c03d.png )
    
    * At this stage, CloneZilla is now actually cloning. Make sure it is not interrupted, or else both disks will be corrupted, and your data will be lost.
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721758323691/34c40d6c-4a4f-4aa6-8156-bdc6f4c57cdc.png )
    
    * If you see this message, congratulations! The cloning has been completed successfully.
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721758439125/a4460c2a-b2bf-47b9-bfae-c87a1b135cad.png )
    
    * Finally, press Enter to continue.
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721758497692/de005f7c-179a-4bbf-b8d8-d091054a878f.png )
    
    * and choose what you want to do. You probably want to power off to remove the old disk.
        
    
![ ](https://cdn.hashnode.com/res/hashnode/image/upload/v1721758528613/dbcfae25-10e8-4a84-a239-f57ccd6b8049.png )
    

# Conclusion

In conclusion, cloning a disk using Clonezilla is a straightforward process that can be completed by following a series of clear steps. By preparing properly, downloading the necessary software, creating a bootable USB drive, and carefully selecting the source and destination disks, you can ensure a successful cloning operation. This guide has provided a detailed walkthrough to help both beginners and experienced users navigate the process easily. Remember to always back up important data before starting and double-check your selections to avoid any data loss. With Clonezilla, you can efficiently upgrade your storage, create backups, or transfer data to a new hard drive. Happy cloning!
